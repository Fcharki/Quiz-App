import React from 'react';
export default function ResultatList(props){
    return(
        <div className='child'>
            <h2>Composant Enfant Résultats</h2>
            {props.resultats.length == 0 ? (
                <p>Pas de résultats</p>
            ):(
                <div className='list'>
                    <ul style={{fontFamily:'verdana'}}>
                        {props.resultats.map((item)=>{
                            return <li key={item.nom}>{item.nom}</li>
                        })
                        }
                    </ul>
                </div>
            ) }
        </div>
    )
}