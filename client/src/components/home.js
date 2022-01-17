import { useState } from "react"

function Home({user, token, api_url}) {

    const [users, setUsers] = useState()
    const [tableVisible, setTableVisible] = useState(false)

    function showAllUsers(){
        if(!users){
            const requestOptions = {
                method: 'GET',
                headers: { 'auth-token': token},
            }
            fetch(`${api_url}/api/users`, requestOptions)
            .then(res => res.json())
            .then(data =>{
                setUsers(data)
            }).catch(err => console.log(err))
        }else{
            document.querySelector('.users-list').style.display = 'block'
        }
        setTableVisible(true)
    }

    function closeAllUsers(){
        document.querySelector('.users-list').style.display = 'none'
        setTableVisible(false)
    }

    function logout() {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className='home'>
            <header className='home-header'>
                <h1 className='user-name'>{user}</h1>
                <button onClick={logout}>Logout</button>
            </header>
            <main>
                {!tableVisible?
                    <button onClick={showAllUsers}>See other users</button>
                :
                    <button onClick={closeAllUsers}>Close list</button>
                }
                <div>
                    {users && 
                    <table className='users-list'>
                        <thead>
                            <tr>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(item=>{
                                return(
                                <tr key={users.indexOf(item)}>
                                    <td>{item.firstname}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </main>
        </div>
    )
}

export default Home
