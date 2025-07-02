function CreateIssueForm(props){
    const handleChange = props.handleChange;
    const title = props.title;
    const description = props.decription;

    return(
        <div className="w-full flex justify-center item-center">
            <form className="w-full space-y-3">
                <div>
                    <label className="block text-lg font-medium text-black">Title: <label className="text-sm text-shadow font-normal">(no more than 50 characters)</label></label>
                    <input name="title" value={title} onChange={handleChange}
                        maxLength={50}
                        className="w-full px-3 py-2 bg-white border-2 border-shadow rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required />
                </div>

                <div>
                    <label className="block text-lg font-medium text-black">Description: <label className="text-sm text-shadow font-normal">(no more than 150 characters)</label></label>
                    <textarea name="description" value={description} onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border-2 border-shadow rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="4"
                        maxLength="150"
                    required >
                    </textarea>
                </div>
            </form>
        </div>
    )
}
export default CreateIssueForm;