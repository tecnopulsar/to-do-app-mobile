import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

import {getFirestore, collection,addDoc,getDocs, doc,deleteDoc,getDoc,setDoc} from 'firebase/firestore'
import appFirebase from "../credenciales";
const db = getFirestore(appFirebase);

export default function CreateNotes(props) {
  const initialState = {
    title: "",
    detail: "",
  };

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [state, setState] = useState(initialState);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hora: " + tempDate.getHours() + "minutos: " + tempDate.getMinutes();
    setDay(fDate);
    setHour(fTime);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  const saveNote = async () => {
    try {
      if(state.title === '' || state.detail===''){
        Alert.alert('importante','debes completar los datos vacios')
      } else{
        const note = {
          title : state.title,
          detail: state.detail,
          day : day,
          hour: hour
        }
        await addDoc(collection(db,'Notas'),{
          ...note
        })
        Alert.alert('Exito','Nota guardada')
        props.navigation.navigate('Notes')
      }
    } catch (error) {
      console.error(error)
    }
    // console.log(note)

  };

  return (
    <View style={styles.containerFather}>
      <View style={styles.target}>
        <View style={styles.container}>
          <TextInput
            placeholder="Ingresa titulo de la tarea"
            style={styles.textInput}
            value={state.title}
            onChangeText={(value) => handleChangeText(value, "title")}
          />
          <TextInput
            placeholder="Ingresa una descripción"
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            value={state.detail}
            onChangeText={(value) => handleChangeText(value, "detail")}
          />
          {/* contenedor de fecha */}
          <View style={styles.inputDate}>
            <TextInput
              placeholder="22/07/2023"
              style={styles.textDate}
              value={day}
            />
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => showMode("date")}
            >
              <Text style={styles.subtitle}>Dia</Text>
            </TouchableOpacity>
          </View>
          {/* contenedor de hora */}
          <View style={styles.inputDate}>
            <TextInput
              placeholder="Hora: 6 Minutos: 30"
              style={styles.textDate}
              value={hour}
            />
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => showMode("time")}
            >
              <Text style={styles.subtitle}>Hora</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date(2023 - 1 - 1)}
            />
          )}
          {/* Boton para enviar losdatos */}
          <View style={styles.inputDate}>
            <TouchableOpacity style={styles.buttonSend} onPress={saveNote}>
              <Text style={styles.textButtonSend}>Guardar una nueva nota</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFather: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  target: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    padding: 20,
  },
  textInput: {
    borderColor: "slategray",
    borderWidth: 1,
    padding: 2,
    marginTop: 10,
    borderRadius: 8,
  },
  inputDate: {
    width: "100%",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  textDate: {
    borderColor: "slategray",
    width: "auto",
    height: "90%",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonDate: {
    backgroundColor: "#871375",
    borderRadius: 5,
    padding: 10,
    width: "30%",
    height: "90%",
    marginLeft: 10,
    marginTop: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
  },
  buttonSend: {
    backgroundColor: "#871375",
    borderColor: "#FC4F00",
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textButtonSend: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontSize: 16,
  },
});
