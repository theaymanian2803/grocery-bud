import { useState, useEffect } from "react";

import "./App.css";

const getFromLocalStorage = () => {
  const data = localStorage.getItem("item");
  if (data) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getFromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [search, setSearch] = useState("");

  const addToList = () => {
    if (!name) {
      return;
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editedId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditedId(null);
      setIsEditing(false);
      setName("");
    } else {
      const newItem = { id: Date.now(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const editItem = (id) => {
    setIsEditing(true);
    const itemFound = list.find((item) => item.id === id);
    console.log(itemFound);
    setName(itemFound.title);
    setEditedId(id);
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const deleteList = () => {
    setList([]);
  };

  const filterdItems = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(list));
  }, [list]);
  return (
    <>
      <div className="h-screen bg-primary flex flex-col justify-center items-center">
        {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

        <div className="relative">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="flea@rhcp.com"
            className="w-[300px] py-2 rounded-md border-gray-200 pe-10 shadow-sm sm:text-sm"
          />

          <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500"></span>
        </div>
        <button
          onClick={addToList}
          className="bg-secondary p-2 rounded-md capitalize w-[150px] mt-3">
          {isEditing ? <>edit</> : <>add</>}
        </button>
        <section className="mt-10">
          <header className="text-center">
            <h1 className="text-xl font-bold text-white sm:text-3xl">
              {list.length === 0 ? (
                <>you have {list.length} items in your bud list</>
              ) : (
                <>grocery bud</>
              )}
            </h1>
          </header>
          <div className="text-center mt-4  mb-5 rounded-md p-3">
            <input
              className="p-3 rounded-md"
              type="text"
              placeholder="search a bud"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filterdItems.map((item) => (
            <ul key={item.id} className="flex items-center gap-4">
              <li className="flex items-center gap-4 py-4">
                <div>
                  <h1 className="text-lg text-white uppercase">{item.title}</h1>
                </div>

                <div className="flex flex-1 items-center justify-end gap-7">
                  <button onClick={() => editItem(item.id)}>
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em">
                      <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-secondary transition hover:text-red-600">
                    <span className="sr-only">Remove item</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-7">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </section>
        <button
          className="bg-secondary text-2xl text-white p-2 rounded-xl shadow-lg"
          onClick={deleteList}>
          clear all list
        </button>
      </div>
    </>
  );
}

export default App;
