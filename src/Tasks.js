import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { destroyTask, updateTask, createTask, filterTasks } from './store';

const Tasks = ()=> {
  const { tasks } = useSelector(state => state);
  const navigate = useNavigate()
  const [name, setName ] = useState('');
  const [complete, setComplete ] = useState(false);
  const [description, setDescription ] = useState('');
  const [difficulty, setDifficulty ] = useState('EASY');
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(()=> {
    const task = tasks.find( task => task.id === id);
    setName(task ? task.name : '');
    setComplete(task ? task.complete: false);
    setDescription(task ? task.description : '')
    setDifficulty(task ? task.difficulty : '')
  }, [tasks, id]);
  
  const save = (ev)=> {
    ev.preventDefault();
    if(id){
      const task = { id, name, complete, description, difficulty };
      dispatch(updateTask(task, navigate));
    }
    else {
      const task = { name, complete, description, difficulty };
      dispatch(createTask(task, navigate));
    }
  };

  const destroy = ()=> {
    dispatch(destroyTask({ id }, navigate));
  };
  return (
    <div>
      <ul>
        {
          tasks.map( task => {
            return (
              <li
                key={ task.id }
                className = { task.complete ? 'complete': ''}
              >
                <Link to={`/tasks/${task.id}`}>
                { task.name }
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {task.description}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span onClick={() => dispatch(filterTasks(task, navigate))}>
                  {task.difficulty}
                </span>
              </li>
            );
          })
        }
      </ul>
      <form onSubmit={ save }>
        <input
          type='checkbox'
          checked={ complete }
          onChange={ ev => setComplete(ev.target.checked)}
        />
        <input value={ name } onChange={ ev => setName(ev.target.value)}/>
        <input value={ description } onChange={ ev => setDescription(ev.target.value)}/>
        <select value = {difficulty}  onChange = {ev => setDifficulty(ev.target.value)}>
          {
            ['EASY', 'MEDIUM', 'HARD'].map(
              item => {
                return (
                  <option 
                    value = {item}
                    key = {['EASY', 'MEDIUM', 'HARD'].indexOf(item)}
                    >
                      {item}
                  </option>
                )
              }
            )
          }
        </select>
        <button disabled={ !name }>Save</button>
      </form>
      { id ? <button onClick={ destroy }>x</button> : null }
    </div>
  );
}; 

export default Tasks;
