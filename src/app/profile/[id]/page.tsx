export default function ProfilePage({params}:any){

    return(
        <div>
            <h1>
              user profile
            </h1>
            <hr />
            <p className="text-4xl">user page {params.id}</p>
        </div>
    )
}