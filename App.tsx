import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema= Yup.object().shape({
  passwordLength:Yup.number()
  .min(4, 'Should be atleast of 4 characters')
  .max(12, 'Should be atmost of 12 characters')
  .required('Length is required')
})

export default function App() {
  const [password, setPassword]= useState('')
  const [isPassGenerated, setIsPassGenerated]= useState(false)
  const [lowerCase, setLowerCase]= useState(true)
  const [upperCase, setUpperCase]= useState(false)
  const [numbers, setNumbers]= useState(false)
  const [symbols, setSymbols]= useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList='';
    
    const upperCaseChars= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars= 'abcdefghijklmnopqrstuvwxyz';
    const digitalChars= '0123456789';
    const specialChars= '!@#$%^&*()_+=-';

    if(upperCase){
      characterList+= upperCaseChars 
    }
    if(lowerCase){
      characterList += lowerCaseChars
      }
    if(numbers){
      characterList+= digitalChars
    } 
    if(symbols){
      characterList+= specialChars
    }
    const passwordResult= createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result='';
    for(let i=0; i < passwordLength; i++){
      const characterIndex= Math.round(Math.random()*characters.length)
      result+=characters.charAt(characterIndex)
    }
    return result;
  }

  const resetPasswordState=()=>{
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values =>{
              console.log(values); 
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors, 
              touched,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapperCenter}>
                  <View style={styles.inputColumnCenter}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType='numeric'
                  />
                </View>

                <View style={styles.checkboxContainer}>
                  <View style={[styles.checkboxWrapper, {backgroundColor: '#29AB87AA'}]}>
                    <Text style={[styles.checkboxLabel, {color: '#11593F'}]}>Include lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>

                  <View style={[styles.checkboxWrapper, {backgroundColor: '#6CD7EAAA'}]}>
                    <Text style={[styles.checkboxLabel, {color: '#226F85'}]}>Include Uppercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#6CD7EA"
                    />
                  </View>

                  <View style={[styles.checkboxWrapper, {backgroundColor: '#DC9AEFAA'}]}>
                    <Text style={[styles.checkboxLabel, {color: '#6D3D77'}]}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#DC9AEF"
                    />
                  </View>

                  <View style={[styles.checkboxWrapper, {backgroundColor: '#C54BBAAA'}]}>
                    <Text style={[styles.checkboxLabel, {color: '#5E1D5C'}]}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#C54BBA"
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={()=> {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ):null}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '90%',
    margin: 16,
    padding: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#CFCCAB',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: '#A0977E',
    textAlign: 'center',
  },
  description: {
    color: '#758283',
    marginBottom: 8,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#DBD9C2',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputWrapperCenter: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputColumnCenter: {
    alignItems: 'center',
  },
  inputStyle: {
    padding: 10,
    width: '80%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#CFCCAB',
    backgroundColor: '#3B3B3B',
    color: '#FFF',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#FF5252',
    marginTop: 4,
    textAlign: 'center',
  },
  checkboxContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  primaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#5DA3FA',
    alignItems: 'center',
  },
  primaryBtnTxt: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#CAD5E2',
    alignItems: 'center',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    width: '90%',
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 15,
  },
  cardElevated: {
    backgroundColor: '#DBD9C2',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});