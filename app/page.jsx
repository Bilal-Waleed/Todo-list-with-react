"use client"
import React, { useState } from 'react'
import { FaCheck, FaTrash, FaEdit, FaPlus, FaTasks } from 'react-icons/fa'
import { MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md'

const Page = () => {
  const [Task, setTask] = useState("")
  const [Description, setDescription] = useState("")
  const [mainTask, setmainTask] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editTask, setEditTask] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (Task.trim() === "") return
    setmainTask([...mainTask, {Task, Description, completed: false}])
    setTask("")
    setDescription("")
  }

  const deleteHandler = (i) => {
    let deleteTask = [...mainTask]
    deleteTask.splice(i, 1)
    setmainTask(deleteTask)
  }

  const editHandler = (i) => {
    setEditingId(i)
    setEditTask(mainTask[i].Task)
    setEditDescription(mainTask[i].Description)
  }

  const updateHandler = (e) => {
    e.preventDefault()
    const updatedTasks = [...mainTask]
    updatedTasks[editingId] = {
      Task: editTask,
      Description: editDescription,
      completed: updatedTasks[editingId].completed 
    }
    setmainTask(updatedTasks)
    setEditingId(null)
    setEditTask("")
    setEditDescription("")
  }

  const toggleComplete = (i) => {
    const updatedTasks = [...mainTask]
    updatedTasks[i] = {
      ...updatedTasks[i],
      completed: !updatedTasks[i].completed
    }
    setmainTask(updatedTasks)
  }

  const renderTasks = mainTask.length > 0 ? (
    mainTask.map((t, i) => {
      if (editingId === i) {
        return (
          <li key={i} className='flex flex-col md:flex-row items-start md:items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-md'>
            <form onSubmit={updateHandler} className='w-full'>
              <input
                type='text'
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className='w-full p-3 mb-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none'
                placeholder='Edit task here...'
                required
              />
              <input
                type='text'
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none'
                placeholder='Edit Description here (Optional)...'
              />
              <div className='flex gap-3 mt-3'>
                <button type='submit' className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-colors'>
                  <FaCheck /> Save Changes
                </button>
                <button 
                  type='button'
                  onClick={() => setEditingId(null)}
                  className='flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold transition-colors'
                >
                  Cancel
                </button>
              </div>
            </form>
          </li>
        )
      }
      
      return (
        <li key={i} className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-md ${t.completed ? 'opacity-70' : ''}`}>
          <div className='flex items-center w-full md:w-2/3 mb-4 md:mb-0'>
            <button 
              onClick={() => toggleComplete(i)} 
              className='mr-4 text-2xl'
            >
              {t.completed ? 
                <MdCheckCircle className="text-green-500" /> : 
                <MdRadioButtonUnchecked className="text-gray-400" />
              }
            </button>
            <div className={`${t.completed ? 'line-through text-gray-400' : ''}`}>
              <h5 className='text-xl md:text-2xl font-bold text-gray-800'>{t.Task}</h5>
              {t.Description && (
                <p className='text-lg md:text-xl text-gray-600 mt-2'>Description: {t.Description}</p>
              )}
            </div>
          </div>
          <div className='flex gap-3'>
            <button 
              onClick={() => editHandler(i)} 
              className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-colors'
            >
              <FaEdit /> Edit
            </button>
            <button 
              onClick={() => deleteHandler(i)} 
              className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors'
            >
              <FaTrash /> Delete
            </button>
          </div>
        </li>
      )
    })
  ) : (
    <div className='text-center py-8'>
      <FaTasks className='mx-auto text-5xl text-gray-300 mb-4' />
      <h2 className='text-xl md:text-2xl font-bold text-gray-300'>No Tasks Available</h2>
      <p className='text-gray-400 mt-2'>Add your first task above</p>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-indigo-700 text-white p-4 md:p-6 text-center'>
        <h1 className='text-3xl md:text-5xl font-bold flex items-center justify-center gap-3'>
          <FaTasks /> My Todo List
        </h1>
      </header>
      
      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        <form onSubmit={submitHandler} className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <div className='mb-4'>
            <label htmlFor="task" className='block text-gray-700 font-medium mb-2'>Task</label>
            <input 
              type='text'
              id="task"
              className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none'
              placeholder='Enter Task here...'
              value={Task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>
          
          <div className='mb-6'>
            <label htmlFor="description" className='block text-gray-700 font-medium mb-2'>Description (Optional)</label>
            <input 
              type='text' 
              id="description"
              className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none'
              placeholder='Enter Description here...'
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            className='w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-bold text-lg transition-colors'
          >
            <FaPlus /> Add Task
          </button>
        </form>
        
        <section className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
            <FaTasks /> Your Tasks
          </h2>
          <ul className='space-y-4'>
            {renderTasks}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Page