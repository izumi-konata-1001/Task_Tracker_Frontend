function SubmitButton(props){
    const handleSubmit = props.handleSubmit;
    return(
        <div className="w-full">
            <div className="w-full flex items-center justify-center">
                <button type="submit" onClick={handleSubmit}
                    className="w-full text-center bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium rounded-xl transition-colors duration-300
                    px-2 py-1 md:px-4 md:py-2">
                    Create
                </button>
            </div>
        </div>
    )
}

export default SubmitButton;