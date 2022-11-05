export default function NFT({ data }) {
    return (

        <div className="rounded-lg shadow-lg bg-white max-w-sm w-full">
            <a href="_blank" rel="noreferrer">
                <img rel="noreferrer" className="rounded-t-lg mx-auto" src={data.imageUrl} alt="" />
            </a>
            <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{data.name}</h5>
                <p className="text-gray-700 text-base mb-4 overflow-auto">
                    {data.description}
                </p>
            </div>
        </div>

    );
}