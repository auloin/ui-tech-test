export default function Response() {

    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Thanks for filling in the form</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">An overview of the data we received from you:</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                {/**
                * Render here the data from the form
                */}
            </div>
        </div>
    )
}