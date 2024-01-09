import classNames from 'classnames'
import styles from './global.module.css'

import './App.css';
import { useRef, useState } from 'react';
import { Checkbox } from './checkbox';

const values = [
  {
    id:1,
    count: 0,
    toDo: `reading`
  },
  
  {
    id:2,
    count: 1,
    toDo: `coding`
  }
]

function App() {
const [list, setList] = useState(values)
const [toDo, setToDo] = useState(``)
const [id, setId] = useState(3)
const [score, setScore] = useState(values.length)

  const toDoRef = useRef(``)

  const handleChage =(evt)=>{
setToDo(evt.target.value)
  }

  const handleAdd =()=>{
    const newlist = toDo ? list.concat({toDo, id: id}) : list
    setList(newlist)
    setId(id+1)
    toDo ? setScore(score + 1) : setScore(score)
    setToDo(``)
  }

  const changeChecked=(evt)=>{
  evt.target.parentElement.className = classNames(styles.listItem, {
    [styles.line]:evt.target.checked,
  })

  !evt.target.checked ? setScore(score + 1) : setScore(score - 1)

  }

  const deleteToDo =(evt)=>{
   evt.target.parentElement.remove()
   if (!evt.target.parentElement.firstChild.checked) {
     setScore(score - 1)
    
   }
  }

  return (
   <div>
    <ul ref={toDoRef} className={styles[`toDoes`]}>
     
      {list.map((val)=>(
        <div key={val.id} className={styles[`listItem`]}>
          <Checkbox onChange={changeChecked}/>
          <li  >{val.toDo }</li>
          
          
          <button className={styles[`button`]} onClick={deleteToDo}>X</button>
        </div>
      ))}
    </ul>
<input onChange={handleChage} value={toDo}  />
<button className={styles[`add_button`]} onClick={handleAdd}>add</button> <br/>
<span>
{`You have to do ${score} things`}
</span>
   </div>
  );
}

export default App;
