import React from 'react'
import style from '../Dashboard/Dashboard.module.css'
import material from 'https://cdn.jsdelivr.net/npm/@material-ui/icons@4.11.3/+esm';

export default function Dashboard() {
  return (
    <div className={style.container}>
      <aside>
        <div className={style.top}>
            <div className={style.logo}>
              <img src="" alt="" />
              <h2>Qui<span className={style.danger}>rkz</span></h2>
            </div>
            <div className={style.close} id={style.close_btn}>

            </div>
        </div>
      </aside>
    </div>
  )
}
