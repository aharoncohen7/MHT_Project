import React, { useState, useEffect, useContext } from "react";
import { FiEyeOff } from "react-icons/fi";
import DataContext2 from '../../contexts/index2'

export default function Search({ setMyPosts, tag, subtopic }) {
    let en = null;
    // console.log(tag, subtopic);
    const { originalData, filteredData, setFilteredData } = useContext(DataContext2)
    const [showSearch, setShowSearch] = useState(true)
    const [titleFormInput, setTitleFormInput] = useState('');
    const [selectedOption, setSelectedOption] = useState(true);
    const [filter, setFilter] = useState('creation date ↑');
    const [id, setId] = useState("");


    // בורר סוג חיפוש
    const handleOptionChange = (event) => {
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        setSelectedOption(event.target.value === "true");
        setFilteredData(originalData);
    };

    //פונקציית המיון
    useEffect(() => {
        const sort_posts = () => {
            const filteredPosts = sortBy(filteredData, filter);
            setMyPosts(filteredPosts);
        };
        if (originalData !== '') {
            sort_posts();
        }
    }, [filteredData, filter])

    //בורר מיון
    const sortBy = (data, sortBy) => {
        switch (sortBy) {
            case 'random':
                return [...data].sort(() => Math.random() - 0.5);
            case 'alphabetical ↓':
                return [...data].sort((a, b) => a.title - b.title);
            case 'alphabetical ↑':
                return [...data].sort((a, b) => a.title - b.title).reverse();
            case 'rating ↓':
                return [...data].sort((a, b) => a.rating - b.rating)
            case 'rating ↑':
                return [...data].sort((a, b) => a.rating - b.rating).reverse()
            case 'creation date ↓':
                return [...data].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            case 'creation date ↑':
                return [...data].sort((a, b) => Date.parse(a.date) - Date.parse(b.date)).reverse();
            default:
                return data;
        }
    };

    // קובע סוג מסנן
    function handleFilterChange(e) {
        setFilter(e.target.value);
    };

    //  סינון לפי כותרת
    useEffect(() => {
        const sortDataByTitle = () => {
            // console.log("sortDataByTitle");
            const data_byTitle = originalData.filter((elm) => elm.title.includes(titleFormInput));
            setFilteredData(data_byTitle);
        };
        if (titleFormInput !== '') {
            sortDataByTitle();
        }
        else {
            setFilteredData(originalData)
        }
    }, [titleFormInput]);


    // סינון לפי מזהה
    useEffect(() => {
        const sortDataById = () => {
            // console.log("sortDataById");
            const data_by_id = originalData.filter((elm) => elm.id === parseInt(id));
            setFilteredData(data_by_id);
        };
        if (id !== "") {
            sortDataById();
        }
        else {
            setFilteredData(originalData)
        }
    }, [id]);



    // סינון לפי פרשה או תג
    useEffect(() => {
        const sortDataByTag = () => {
            // console.log("sortDataByTag");
            const data_by_tag = originalData.filter((elm) =>
                elm.tags != null && elm.tags.split(',').includes(tag
                    // .trim()
                )
            );
            setFilteredData(data_by_tag);
            // console.log(data_by_tag);
            // console.log("filteredData", filteredData);
        };

        const sortDataByTopic = () => {
            // console.log("sortDataByTopic");
            const data_by_subtopic = originalData.filter((elm) =>
                elm.subtopic != null && elm.subtopic == subtopic
            );
            setFilteredData(data_by_subtopic);
            // console.log("filteredData", filteredData);
            // console.log("data_by_subtopic", data_by_subtopic);
        };

        if (tag !== null) {
            // console.log("tag");
            sortDataByTag();
            return
        }
        if (subtopic !== null) {
            // console.log("subtopic");
            sortDataByTopic();
            return
        }
        setFilteredData(originalData)

    }, [tag, subtopic]);






    return (
        <>
            {showSearch && <div className="hidden sm:ml-6 sm:block fixed left-1/2 w-3/6 top-40 text-center transform -translate-x-1/2 -translate-y-1/2  p-4 bg-gray-300 rounded-lg shadow-md z-10">

                <div className="flex items-center justify-center mb-2  ">
                    <label htmlFor="search-by-id">
                        <input
                            type="radio"
                            name="options"
                            value="false"
                            className="w-4 h-4 mr-2"
                            checked={selectedOption === false}
                            onChange={handleOptionChange}
                        />  חפש לפי מזהה
                    </label>

                    <label htmlFor="search-by-title"><input
                        type="radio"
                        name="options"
                        value="true"
                        className="w-4 h-4 ml-2 mr-2"
                        checked={selectedOption === true}
                        onChange={handleOptionChange}
                    />  חפש לפי כותרת</label>

                </div>
                <div className="flex items-center justify-center mb-2">
                    <div className={selectedOption ? 'hidden' : 'block mt-6 '}>
                        <input
                            id="input1"
                            type="text"
                            className="block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-right rtl"
                            onChange={(event) => setId(event.target.value)}
                            placeholder="חפש לפי מזהה"
                        />
                    </div>

                    <div className={!selectedOption ? 'hidden' : 'block mt-6 text-center rtl'}>
                        <input
                            id="input2"
                            type="text"
                            className="block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-right "
                            onChange={(event) => setTitleFormInput(event.target.value)}
                            placeholder="חפש בתוכן כותרת"
                        />
                    </div>

                    <div className="flex items-center justify-center rtl mt-4">

                        {selectedOption}

                        <select id="filter" onChange={handleFilterChange} className="px-2 py-1 ml-2 h-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" value={filter}>
                            <option className="" value="sequential">Sequential</option>
                            <option className="" value="alphabetical ↓">Alphabetical ↓</option>
                            <option className="" value="alphabetical ↑">Alphabetical ↑</option>
                            <option className="" value="random">Random</option>
                            <option className="" value="rating ↓">Rating ↑</option>
                            <option className="" value="rating ↑">Rating ↓</option>
                            <option className="" value="creation date ↓">Old to new ↓</option>
                            <option className="" value="creation date ↑">Creation date ↑</option>

                        </select>

                    </div>

                </div>
                <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onClick={() => setShowSearch(false)}
                >
                    <span className="text-lg font-bold text-gray-500"><FiEyeOff /></span>
                </button>
            </div>}
        </>

    )
}
