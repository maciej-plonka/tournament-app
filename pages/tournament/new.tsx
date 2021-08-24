import {NextPage} from "next";
import {FormEvent, useState} from "react";

const NewTournament: NextPage = () => {
    const [title, setTitle] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <div className="container mx-auto py-4">
            <div className="shadow-md rounded-xl p-4">
                <h1 className="text-3xl text-gray-700">New tournament</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <label htmlFor="title-input">Title</label> <br/>
                    <input
                        id="title-input"
                        className=" border border-gray-300 rounded px-2 py-1"
                        value={title}
                        onChange={event => setTitle(event.target.value)}/>

                    <button
                        className="block px-3 py-1.5 rounded bg-green-500 text-white"
                        type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )

}
export default NewTournament
