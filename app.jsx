import React, { Component } from "react";
import * as ReactDOM from 'react-dom'
import './app.css'

// import MenuIcon from '@material-ui/icons/Menu'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

export default class App extends Component{

    constructor(){
        super();
        this.state = {
            numbers : [],
            _numbersAux : [],
            inputDisabled : false,
            showReturnButton : false,
            showSelectedButton: true
        }
    }

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    getNumbersList = (event) => {
        this.setState({
            numbers :(event.target.value).split(','),
            _numbersAux :(event.target.value).split(','),
        },()=>{})
    };

    setSelectedNumber = () => {

        const POSITION = this.getRandomInt(0,this.state._numbersAux.length);

        this.setState({
            selectedNumber : this.state._numbersAux[POSITION],
            inputDisabled : true
        },()=>{
            //Eliminamos el elemento del array
            let aux_number_list = this.state._numbersAux;
            aux_number_list.splice(POSITION,1);
            this.setState({_numbersAux:aux_number_list},()=>{

                //En caso de no haber más elementos, enseñaresmos el botón de reiniciar
                if(this.state._numbersAux.length === 0){
                    this.setState({showReturnButton: true,showSelectedButton: false})
                }
            })
        })

    };

    restart = () => {
        this.setState({
            numbers : [],
            _numbersAux : [],
            inputDisabled : false,
            showReturnButton : false,
            showSelectedButton: true,
            selectedNumber:null
        })
    };

    render(){
        return (
            <section className="container">

                {/*<section className="menuSection" id="menuSection"></section>*/}

                {/*<button className="menuButton" id="menuButton"> <p> Menú </p></button>*/}

                <h1>Indexódromo</h1>

                <p className="descripcion">Escribe los números de los temas separado por comas <br/> y dale al play</p>

                <input type="text" id="numbers" value={this.state.numbers} disabled={this.state.inputDisabled} onChange={this.getNumbersList} name="numbers"/>

                {this.state._numbersAux.length > 0 && this.state.selectedNumber &&
                <p id="elmRestantes">Quedan {this.state._numbersAux.length} elementos restantes</p>
                }

                {this.state.showSelectedButton &&
                    <button onClick={this.setSelectedNumber}><PlayArrowIcon/></button>}

                {this.state.showReturnButton && (this.state._numbersAux.length === 0) &&
                    <button onClick={this.restart}><SettingsBackupRestoreIcon/></button>
                }

                {this.state.selectedNumber &&
                    <p id="resultado">{this.state.selectedNumber}</p>
                }

            </section>
        )
    }

}

ReactDOM.render(
            <App/>,
    document.getElementById('app')
);