import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect } from 'react'

import appFirebase from "../credenciales";
import {getFirestore, collection,addDoc,getDocs, doc,deleteDoc,getDoc,setDoc} from 'firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler';
const db = getFirestore(appFirebase);

export default function DetailsNotes(props) {
  const [note, setNote] = useState({})

  const getOneNote = async (id)=>{
    try {
      const docRef = doc(db,'Notas',id)
      const docSnap = await getDoc(docRef)
      setNote(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getOneNote(props.route.params.noteId)
  },[])

  const deleteNote = async (id)=>{
    await deleteDoc(doc(db,'Notas',id))
    Alert.alert('Eliminar','Nota borrada')
    props.navigation.navigate('Notes')
  }

  return (
    <View>
      <View>
        <Text style={styles.text}>Titulo: {note.title}</Text>
        <Text style={styles.text}>Detalle: {note.detail}</Text>
        <Text style={styles.text}>Fecha: {note.day}</Text>
        <Text style={styles.text}>Horario: {note.hour}</Text>
        <TouchableOpacity style={styles.buttonDelete} onPress={()=>deleteNote(props.route.params.noteId)}>
          <Text style={styles.textDelete}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  text:{
    fontSize:16,
    fontWeight:'600',
    marginTop:10
  },
  buttonDelete: {
    backgroundColor: "#871375",
    borderColor: "#FC4F00",
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textDelete:{
    textAlign:'center',
    padding:10,
    color:'white',
    fontSize:16
  }
})

