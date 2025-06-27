function CreateIssueForm(props){
    const handleChange = props.handleChange;
    const title = props.title;
    const description = props.decription;

    return(
        <div class="w-full px-40 flex justify-center item-center">
            <form class="w-full space-y-6">
                <div>
                    <label class="block text-lg font-medium text-black mb-1">Title:</label>
                    <input name="title" value={title} onChange={handleChange}
                        class="w-full px-3 py-2 bg-white border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required />
                </div>

                <div>
                    <label class="block text-lg font-medium text-black mb-1">Description:</label>
                    <textarea name="description" value={description} onChange={handleChange}
                    class="w-full px-3 py-2 bg-white border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                    required >
                    </textarea>
                </div>
            </form>
        </div>
    )
}
export default CreateIssueForm;