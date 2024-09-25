import React, { useState, useEffect, useContext } from "react";
import { FiEyeOff } from "react-icons/fi";
import DataContext from '../../contexts/dataContext'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UserContext from "../../contexts";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";

export default function Search({ setSortedList }) {
    const { adminMode } = useContext(UserContext)
    const { originalData, filteredData, setFilteredData, parasha } = useContext(DataContext)
    console.log(parasha);
    const [showSearch, setShowSearch] = useState(true)
    const [selectedOption, setSelectedOption] = useState(true);
    const [filter, setFilter] = useState('creation date ↑');
    const [input, setInput] = useState('');
    const [idToSearch, setIdToSearch] = useState('');
    const searchParams = new URLSearchParams(window.location.search);
    const tag = searchParams.get('tag');
    const subtopic = searchParams.get('parasha');
    const authorId = searchParams.get('author');


    //פונקציית המיון
    useEffect(() => {
        if (originalData !== '') {
            if (tag !== null) {
                setSortedList(sortBy(filter).filter((elm) => elm.tags != null && elm.tags.split(',').includes(tag
                    // .trim()
                )));
                return
            }
            // אם יש פרשה בנתיב
            if (subtopic !== null) {
                if (subtopic==="all"){
                    setSortedList(sortBy(filter))
                    return
                }
                setSortedList(sortBy(filter).filter((elm) => elm.subtopic != null && elm.subtopic == subtopic));
                return
            }
            // אם יש מזהה מחבר בנתיב
            if (authorId !== null) {
                setSortedList(sortBy(filter).filter((elm) => elm.userId == authorId));
                return
            }
            if(parasha) {
                const parashaName = parasha.split(' ')[1];
                if(parashaName.split("-").length){
                    const parashaName1 = parashaName.split("-")[0];
                    const parashaName2 = parashaName.split("-")[1];
                    setSortedList(sortBy(filter).filter(elm => elm.subtopic != null && (elm.subtopic === parashaName1 || elm.subtopic === parashaName2)));
                    return;
                }
                else{
                    setSortedList(sortBy(filter).filter(elm => elm.subtopic != null && elm.subtopic === parashaName));
                    return;
                }
            }
            setSortedList(sortBy(filter));
        }
    }, [filteredData, filter, tag, authorId, subtopic])


    // קובע סוג מיון
    function handleSortChange(e) {
        setFilter(e.target.value)
    };

    //בורר סוגי מיון
    const sortBy = (sortBy) => {
        switch (sortBy) {
            case 'random':
                return [...filteredData].sort(() => Math.random() - 0.5);
            case 'alphabetical ↓':
                return [...filteredData].sort((a, b) => a.title - b.title);
            case 'alphabetical ↑':
                return [...filteredData].sort((a, b) => a.title - b.title).reverse();
            case 'rating ↓':
                return [...filteredData].sort((a, b) => a.rating - b.rating)
            case 'rating ↑':
                return [...filteredData].sort((a, b) => a.rating - b.rating).reverse()
            case 'creation date ↓':
                return [...filteredData].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            case 'creation date ↑':
                return [...filteredData].sort((a, b) => Date.parse(a.date) - Date.parse(b.date)).reverse();
            default:
                return filteredData;
        }
    };


    //  סינון
    // בורר סוג סינון
    const handleOptionChange = (event) => {
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        setSelectedOption(event.target.value === "true");
        setFilteredData(originalData);
    };

    //  סינון לפי תוכן
    useEffect(() => {
        if (input === "") {
            setFilteredData(originalData)
            return
        }
        setFilteredData(originalData.filter((elm) =>
            elm.title.includes(input) || elm.body.includes(input)));
    }, [input]);


    //  - סינון לפי מזהה - עבור אדמין
    useEffect(() => {
        if (idToSearch === "") {
            setFilteredData(originalData)
            return
        }
        setFilteredData(originalData.filter((elm) => elm.id === parseInt(idToSearch)));
    }, [idToSearch]);




    return (
        <>
            
                <div className={`hidden sm:ml-6 sm:block fixed left-1/2 w-3/6 ${showSearch ? "top-32" : "top-24"} text-center transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-lg shadow-md z-10`}>
                    {showSearch && <>
                    {adminMode &&  <div className="flex items-center justify-center mb-2 ">
                        <label htmlFor="search-by-id">
                        <input
                            type="radio"
                            name="options"
                            value="false"
                            id="search-by-id"
                            className="w-4 h-4 mr-2"
                            checked={selectedOption === false}
                            onChange={handleOptionChange}
                        />  חפש לפי מזהה
                    </label>

                        <label htmlFor="search-by-title"><input
                            type="radio"
                            name="options"
                            value="true"
                            id="search-by-title"
                            className="w-4 h-4 ml-2 mr-2"
                            checked={selectedOption === true}
                            onChange={handleOptionChange}
                        />  חפש לפי כותרת</label> </div>}


                    <div className="flex items-center justify-center mb-2">
                        <div className={selectedOption ? 'hidden' : 'block mt-6 '}>
                            <input
                                id="input1"
                                type="text"
                                className="block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-right rtl"
                                onChange={(event) => setIdToSearch(event.target.value)}
                                placeholder="חפש לפי מזהה"
                            />
                        </div>

                        <div className={!selectedOption ? 'hidden' : 'block mt-5 text-center rtl'}>
                            <input
                                id="input2"
                                type="text"
                                className="block w-full  px-2 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-right "
                                onChange={(event) => setInput(event.target.value)}
                                placeholder=" חפש בתוכן מאמר"
                            />
                        </div>

                        <div className="flex items-center justify-center rtl mt-4">

                            {selectedOption}
                            <select id="sort" onChange={handleSortChange} className="px-2 py-1 ml-2 h-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" value={filter}>
                                {/* <option className="" value="sequential">Sequential</option> */}
                                {/* <option className="" value="alphabetical ↓">א-ת </option> */}
                                {/* <option className="" value="alphabetical ↑">ת-א </option> */}
                                <option className="" value="random">אקראי</option>
                                <option className="" value="rating ↓">המדורג ביותר</option>
                                {/* <option className="" value="rating ↑">מדורג נמוך</option> */}
                                <option className="" value="creation date ↓">מהישן לחדש</option>
                                <option className="" value="creation date ↑">מהחדש לישן</option>

                            </select>

                        </div>

                    </div>
                    </>}
                    
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1"
                        onClick={() => setShowSearch(!showSearch)}
                    >{showSearch? <CiCircleChevUp size="40px"/> : <CiCircleChevDown size="40px"/>}
                        {/* <span className="text-lg font-bold text-gray-500"><CiCircleChevUp /></span> */}
                    </button>
                    

                    {/* <ButtonGroup
                        color="green"
                        orientation="horizontal"
                        // variant="elevated" 

                        variant="filled"
                        aria-label="Basic button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup> */}



                </div>
        </>

    )
}
