import '../styles/dashboard.css'
import { useState } from "react"

function Dashboard({userData, api_url}) {

    const [users, setUsers] = useState()
    const [tableVisible, setTableVisible] = useState(false)

    function showAllUsers(){
        if(!users){
            const requestOptions = {
                method: 'GET',
                headers: { 'auth-token': userData.token},
            }
            fetch(`${api_url}/api/users`, requestOptions)
            .then(res => res.json())
            .then(data =>{
                setUsers(data)
            }).catch(err => console.log(err))
        }else{
            document.querySelector('.users-table').style.display = 'block'
        }
        setTableVisible(true)
    }

    function closeAllUsers(){
        document.querySelector('.users-table').style.display = 'none'
        setTableVisible(false)
    }

    function logout() {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className='dashboard'>
            <header className='dash-header'>
                <h1 className='user-name'>{userData.fname} {userData.lname}</h1>
                <button className='logout-btn' onClick={logout}>Logout</button>
            </header>
            <main className='dash-main'>
                {!tableVisible?
                    <button className='user-list-btn' onClick={showAllUsers}>See other users</button>
                :
                    <button className='user-list-btn' onClick={closeAllUsers}>Close list</button>
                }

                {users && 
                <table className='users-table'>
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
                </table>}
            </main>
        </div>
    )
}

export default Dashboard
