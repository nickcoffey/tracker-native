import React, {useState} from 'react'
import {Button} from 'react-native-elements'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import Form, {InputType} from '../../../components/Form'
import FullScreenModal from '../../../components/FullScreenModal'
import {Exercise, ExerciseCreateInput, ADD_EXERCISE} from '../../../graphql/ExerciseGQL'
import {CategoryWithExercisesData} from '../../../graphql/CategoryGQL'

type NewExerciseProps = {
  isFormVisible: boolean
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  categoryId: string
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<CategoryWithExercisesData>>
}

const NewExercise = ({isFormVisible, setIsFormVisible, categoryId, refetch}: NewExerciseProps) => {
  const blankExercise: ExerciseCreateInput = {
    name: '',
    desc: '',
    categoryId
  }
  const [newExercise, setNewExercise] = useState(blankExercise)
  const exerciseInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newExercise.name
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newExercise.desc || ''
    }
  ]

  const [addExercise] = useMutation<{returnedExercise: Exercise}, {newExercise: ExerciseCreateInput}>(ADD_EXERCISE, {
    variables: {newExercise}
  })

  const handleChange = (key: string, value: string) => {
    setNewExercise({...newExercise, [key]: value})
  }

  const handleSubmit = () => {
    addExercise()
    refetch()
    setNewExercise(blankExercise)
    setIsFormVisible(false)
  }

  const handleClose = () => setIsFormVisible(false)

  return (
    <FullScreenModal isVisible={isFormVisible}>
      <Form inputs={exerciseInputs} title='New Exercise' handleChange={handleChange} handleSubmit={handleSubmit} />
      <Button title='Close' type='clear' onPress={handleClose} />
    </FullScreenModal>
  )
}

export default NewExercise
