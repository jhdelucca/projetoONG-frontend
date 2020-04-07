import React, { useState } from 'react';
import './style.css'
import logoImg from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
    
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            const response = await api.post('incidents' , data ,{
                headers: {
                    Authorization: ongId,
                }
            })
            alert(`Caso cadastrado. ID: ${response.data.id}`)
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso. Tente novamente')
            document.getElementById("valor").value = "";
            document.getElementById("desc").value = "";
            document.getElementById("titulo").value = "";
            
        }
    }
    return (
        <>
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero"></img>

                        <h1>Cadastro novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso</p>

                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                            Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={handleNewIncident}>

                        <input
                            id="titulo" 
                            placeholder="Titulo do caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        <textarea
                            id="desc"  
                            placeholder="descricao"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <input 
                            id="valor"
                            placeholder="valor em reais"
                            value={value}
                            type="number"
                            onChange={e => setValue(e.target.value)}  />

                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    );
}