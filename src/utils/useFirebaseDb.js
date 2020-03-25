import { useEffect, useState } from "react"
import firebase from "firebase/app"
import "firebase/database"

/**
 * 
 * @param {String} dbNode : a path to a child node in the database
 */
export default function useFirebaseDb(dbNode) {
  const [value, setValue] = useState({})
  const [ref, setRef] = useState(null)

  useEffect(() => {
    const dbRef = firebase.database().ref(dbNode)
    setRef(dbRef)
    dbRef.on('value', snap => {
      if (snap !== null) {
        setValue(snap.val())
      }
    })
  }, [dbNode])

  return [value, ref]
}