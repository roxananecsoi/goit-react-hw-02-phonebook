import React from 'react';
import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFilterChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts:</h2>
        <SearchFilter
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
          className={styles.list}
        />
      </div>
    );
  }
}

export default App;
