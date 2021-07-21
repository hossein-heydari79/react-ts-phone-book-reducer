import React, { useState, useReducer } from "react";
import "./App.scss";
import { Contacts, Favorite, Person } from "./pages";
import { Switch, Route } from "react-router-dom";
import { ContactsData } from "./ContactsData";
import { FaUsers } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IContactsData {
  name: string;
  des: string;
  profile: string;
}

interface IAction {
  type: string;
  payload: IContactsData[];
}

function reducer(data: IContactsData[], action: IAction): IContactsData[] {
  switch (action.type) {
    case "NEW_DATA": {
      return action.payload;
    }

    default:
      return data;
  }
}

function starReducer(star: IContactsData[], action: IAction): IContactsData[] {
  switch (action.type) {
    case "NEW_STAR_DATA": {
      return action.payload;
    }

    default:
      return star;
  }
}

function App() {
  const [data, dataDispatch] = useReducer(reducer, ContactsData);
  const [star, starDispatch] = useReducer(starReducer, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Contacts
              star={star}
              starDispatch={starDispatch}
              data={data}
              dataDispatch={dataDispatch}
            />
          )}
        />
        <Route
          path="/favorites"
          render={() => <Favorite star={star} starDispatch={starDispatch} />}
        />
        <Route path="/:id" render={() => <Person data={data} />} />
      </Switch>

      <div className="footer">
        <Link to="/">
          <FaUsers size={30} style={{ cursor: "pointer", color: "black" }} />
        </Link>
        <Link to="/favorites">
          <FaRegStar size={30} style={{ cursor: "pointer", color: "black" }} />
        </Link>
      </div>
    </div>
  );
}

export default App;
