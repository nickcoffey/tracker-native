import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ApolloQueryResult} from 'apollo-boost'

import Form, {InputType} from '../../../components/Form'
import FullScreenModal from '../../../components/FullScreenModal'
import {Exercise, ExerciseData, ExerciseUpdateInput, UPDATE_EXERCISE} from '../../../graphql/ExerciseGQL'

type EditExerciseProps = {
  exercise: Exercise
  isFormVisible: boolean
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<ExerciseData>>
}

const EditExercise = ({exercise, isFormVisible, setIsFormVisible, refetch}: EditExerciseProps) => {
  const [editableExercise, setEditableExercise] = useState(() => {
    const {id, name, desc, category} = exercise
    return {id, name, desc, categoryId: category.id}
  })

  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: editableExercise.name
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: editableExercise.desc
    }
  ]

  const [updateExercise] = useMutation<{returnedExercise: ExerciseData}, {updatedExercise: ExerciseUpdateInput}>(
    UPDATE_EXERCISE,
    {
      variables: {
        updatedExercise: editableExercise
      }
    }
  )

  const handleChange = (key: string, value: string) => {
    editableExercise && setEditableExercise({...editableExercise, [key]: value})
  }

  const handleSubmit = () => {
    updateExercise()
      .then(() => refetch())
      .catch((err) => console.log(err))
    setIsFormVisible(false)
  }

  const handleClose = () => setIsFormVisible(false)

  return (
    <FullScreenModal handleClose={handleClose} isVisible={isFormVisible}>
      <Form inputs={inputs} title={`Edit ${exercise.name}`} handleChange={handleChange} handleSubmit={handleSubmit} />
    </FullScreenModal>
  )
}

export default EditExercise
