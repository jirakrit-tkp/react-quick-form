import { useState } from "react";
import { movies } from "../constants/movies";
import { useNavigate } from "react-router-dom";

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

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
        let submitSuccess = true;

        if (formData.name.length === 0) {
            setIsValid(prev => ({ ...prev, name: false }));
            setWarningMessage(prev => ({ ...prev, name: "name is required"}));
            submitSuccess = false;
        } else {setIsValid(prev => ({ ...prev, name: true }))}
        if (formData.email.length === 0) {
            setIsValid(prev => ({ ...prev, email: false }));
            setWarningMessage(prev => ({ ...prev, email: "email is required"}));
            submitSuccess = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setIsValid(prev => ({ ...prev, email: false }));
            setWarningMessage(prev => ({ ...prev, email: "please enter a valid email"}));
            submitSuccess = false;
        } else {setIsValid(prev => ({ ...prev, email: true }))}
        if (formData.movie.length === 0) {
            setIsValid(prev => ({ ...prev, movie: false }));
            setWarningMessage(prev => ({ ...prev, movie: "please select you favorite movie"}));
            submitSuccess = false;
        } else {setIsValid(prev => ({ ...prev, movie: true }))}

        if (submitSuccess) {
            setShowSuccessAlert(true);
        }
    };

    const handleStartNewCritique = () => {
        setFormData({
            name: "",
            email: "",
            movie: "",
            comment: ""
        });
        setIsValid({
            name: true,
            email: true,
            movie: true,
            comment: true
        });
        setWarningMessage({
            name: "",
            email: "",
            movie: "",
            comment: ""
        });
        setShowSuccessAlert(false);
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
            {showSuccessAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-orange-500/20 max-w-md mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-green-400 mb-2">Success!</h3>
                            <p className="text-gray-300 mb-6">Your movie critique has been submitted successfully.</p>
                            
                            {/* Summary Section */}
                            <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                                <h4 className="text-lg font-semibold text-orange-400 mb-3">Critique Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Name:</span>
                                        <span className="text-white font-medium">{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Email:</span>
                                        <span className="text-white font-medium">{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Movie:</span>
                                        <span className="text-white font-medium">{formData.movie}</span>
                                    </div>
                                    <div className="border-t border-gray-600 pt-2">
                                        <span className="text-gray-400 block mb-1">Comment:</span>
                                        <span className="text-white font-medium">{formData.comment}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleStartNewCritique}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg w-full"
                            >
                                Start New Critique
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="max-w-md mx-auto">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-orange-500/20">
                    <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">
                        Movie Critique Form
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
                                onClick={()=>{
                                    setFormData({
                                        name: "",
                                        email: "",
                                        movie: "",
                                        comment: ""});
                                    setIsValid({
                                        name: true,
                                        email: true,
                                        movie: true,
                                        comment: true});
                                }}
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