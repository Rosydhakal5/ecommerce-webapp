import { doc, getDoc } from 'firebase/firestore'
import { setUserInfo } from './authSlice'
import { enqueueSnackbar } from 'notistack'
import { db } from '../../firebase'

export const getUserInfoAction = (uid) => async (dispatch) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const userExist = docSnap.data()
    dispatch(setUserInfo(userExist))
    enqueueSnackbar('Logged IN', { variant: 'success' })
  } else {
    enqueueSnackbar('Error Encountered try again', { variant: 'error' })
  }
}
