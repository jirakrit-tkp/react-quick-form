import { useState } from "react";
import { movies } from "../constants/movies";

function MovieForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        movie: "",
        comment: ""
    });
    
    const [isValid, setIsValid] = useState({
        name: true,
        email: true,
        movie: true,
        comment: true
    })

    const [warningMessage, setWarningMessage] = useState({
        name: "",
        email: "",
        movie: "",
        comment: ""
    }); 

    // DRY: Reusable function for text input fields
    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({ ...prev, [field]: event.target.value }));
    };

    // DRY: Reusable function for radio input fields
    const handleRadioChange = (event) => {
        setFormData(prev => ({ ...prev, movie: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name.length === 0) {
            setIsValid(prev => ({ ...prev, name: false }));
            setWarningMessage(prev => ({ ...prev, name: "name is required"}));
        }
        if (formData.email.length === 0) {
            setIsValid(prev => ({ ...prev, email: false }));
            setWarningMessage(prev => ({ ...prev, email: "email is required"}));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setIsValid(prev => ({ ...prev, email: false }));
            setWarningMessage(prev => ({ ...prev, email: "please enter a valid email"}));
        }
        if (formData.movie.length === 0) {
            setIsValid(prev => ({ ...prev, movie: false }));
            setWarningMessage(prev => ({ ...prev, movie: "please select you favorite movie"}));
        }
    };

    // DRY: Reusable function for text input
    const renderTextInput = (field, label, placeholder, size = "px-4 py-2") => {
        return (
            <label key={field} className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-orange-300">{label}</span>
                <input
                    id={field}
                    name={field}
                    type="text"
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={handleInputChange(field)}
                    className={`${size} bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 text-white placeholder-gray-400 text-left`}
                    style={{ paddingTop: '0.75rem' }}
                />
            </label>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-orange-500/20">
                    <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">
                        Movie Critic Form
                    </h2>
                    
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        {renderTextInput("name", "Name", "Enter name here")}
                        {isValid.name ? null : <span className="text-red-500 text-sm -mt-6 block">{warningMessage.name}</span>}

                        {renderTextInput("email", "Email", "Enter email here")}
                        {isValid.email ? null : <span className="text-red-500 text-sm -mt-6 block">{warningMessage.email}</span>}
                        
                        <div className="space-y-3">
                            <span className="text-sm font-medium text-orange-300">Select a Movie</span>
                            <div className="space-y-3">
                                {movies.map((item) => (
                                    <label key={item.title} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:bg-gray-700 cursor-pointer transition-colors duration-200 bg-gray-700/50">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={item.title}
                                            checked={formData.movie === item.title}
                                            onChange={handleRadioChange}
                                            className="w-4 h-4 text-orange-500 border-gray-500 focus:ring-orange-500 checked:bg-orange-500 checked:border-orange-500"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-white">{item.title}</span>
                                            <div className="text-sm text-gray-300">
                                                <span>{item.year}</span>
                                                <span className="mx-2 text-orange-500">•</span>
                                                <span>{item.director}</span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {isValid.movie ? null : <span className="text-red-500 text-sm -mt-6 block">{warningMessage.movie}</span>}
                        
                        {renderTextInput("comment", "Comment", "Add comment here", "px-4 py-12")}
                        
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                onClick={()=>setFormData({
                                    name: "",
                                    email: "",
                                    movie: "",
                                    comment: ""
                                })}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MovieForm;