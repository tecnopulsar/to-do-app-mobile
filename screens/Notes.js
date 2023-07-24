import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {getFirestore, collection,addDoc,getDocs, doc,deleteDoc,getDoc,setDoc} from 'firebase/firestore'
import appFirebase from "../credenciales";
const db = getFirestore(appFirebase);

import { ListItem } from "@rneui/base";
import { ListItemChevron } from "@rneui/base/dist/ListItem/ListItem.Chevron";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";

export default function Notes(props) {
  const [lista, setLista] = useState([]);

  // logica para llamar lista de documentos
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Notas"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, detail, day, hour } = doc.data();
          docs.push({
            id: doc.id,
            title,
            detail,
            day,
            hour,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Create")}
        >
          <Text style={styles.textButton}>Crear Notas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contenedor}>

        {lista.map((note) => (
          <ListItem key={note.id} bottomDivider onPress={()=>{
            props.navigation.navigate('Details',{
              noteId: note.id
            })
          }}>
            <ListItemChevron />

            <ListItemContent>
              <ListItemTitle style={styles.titulo}>{note.title}</ListItemTitle>
              <ListItemSubtitle>{note.day}</ListItemSubtitle>
            </ListItemContent>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#871375",
    borderColor: "#FC4F00",
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textButton: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontSize: 16,
  },
  contenedor: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontWeight: "bold",
  },
});
