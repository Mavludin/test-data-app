import React from 'react';
import classes from './PopUp.module.css';

import closeIcon from '../../img/close-icon.svg';

class PopUp extends React.Component {

    state = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: 0,
        desc: ''
    }
    
    id = React.createRef();
    firstName = React.createRef();
    lastName = React.createRef();
    email = React.createRef();
    phone = React.createRef();
    streetAddress = React.createRef();
    city = React.createRef();
    state = React.createRef();
    zip = React.createRef();
    desc = React.createRef();

    onDataListen = () => {
        this.setState({
            id: this.id.current.value,
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            phone: this.phone.current.value,
            streetAddress: this.streetAddress.current.value,
            city: this.city.current.value,
            state: this.state.current.value,
            zip: this.zip.current.value,
            desc: this.desc.current.value,
        });
    }

    componentDidMount() {
        document.addEventListener('keyup', (e)=>{
            if (e.key === 'Escape') {
                this.props.closePopUp();
            }
        })
    }

    render() {

        const obj = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            address: {
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip
            },
            description: this.state.desc
        }


        const isObjectValid = Object.values(obj).every(x => x);

        return (
            <div ref={this.props.popUp} className={classes.PopUp}>
                <form onSubmit={(e)=>{e.preventDefault()}} action="/">
                    <input value={this.state.id} ref={this.id} onChange={this.onDataListen} type="number" name="id" placeholder="Id" required/>
                    <input value={this.state.firstName} ref={this.firstName} onChange={this.onDataListen} type="text" name="firstName" placeholder="Имя" required/>
                    <input value={this.state.lastName} ref={this.lastName} onChange={this.onDataListen} type="text" name="lastName" placeholder="Фамилия" required/>
                    <input value={this.state.email} ref={this.email} onChange={this.onDataListen} type="email" name="email" placeholder="Эл. почта" required/>
                    <input value={this.state.phone} ref={this.phone} onChange={this.onDataListen} type="tel" name="phone" placeholder="Телефон" required/>
                    <input value={this.state.streetAddress} ref={this.streetAddress} onChange={this.onDataListen} type="text" name="streetAddress" placeholder="Улица" required/>
                    <input value={this.state.city} ref={this.city} onChange={this.onDataListen} type="text" name="city" placeholder="Город" required/>
                    <input value={this.state.state} ref={this.state} onChange={this.onDataListen} type="text" name="state" placeholder="Провинция/Штат" required/>
                    <input value={this.state.zip} ref={this.zip} onChange={this.onDataListen} type="number" name="zip" placeholder="Почтовый индекс" required/>
                    <textarea value={this.state.idescd} ref={this.desc} onChange={this.onDataListen} type="text" name="description" placeholder="Описание" required/>
                    <button className="blackBtn" onClick={(e)=>{
                                    this.props.addNewData(obj);
                                    this.props.closePopUp();
                        }} type="submit">Добавить</button>
                </form>
                <img onClick={this.props.closePopUp} src={closeIcon} alt="Close Icon"/>
            </div>
        )
    }
}

export default PopUp;