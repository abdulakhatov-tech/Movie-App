
import React, {Component} from "react";
import {data} from './data.js'


class Table extends Component {
    constructor(props){
        super(props);
        this.state={
            data,
            name: '',
            status: '',
            id: '',
            age: '',
            selectedUser: 'null',
        };
    }

    render(){


        const onDelete = (id)=> {
            let res = this.state.data.filter(data => data.id !==id) // for + if/else
            this.setState({...this.state, data:res})
        }

       
        const onFilter = (e) => {
            const { value,name, status,id, age } = e.target;
            let res = data.filter((data) =>
                ${data[name || status || id  === data.id || age === data.id]}.toLowerCase().includes(value.toLowerCase())
            );
            this.setState({
                data: res,
            });
        };

        const onUpdate = (data) => {
            this.setState({...this.state, selectedUser: data})
        }

        const onChange = (e) =>{
            const {value ,name} = e.target;
            this.setState({...this.state, selectedUser: {...this.state.selectedUser, [name]:value}})   
        }

        const onSave = ()=>{
            let res = this.state.data.map(data => data.id === this.state.selectedUser.id ? this.state.selectedUser : data)
            this.setState({...this.state, data: res, selectedUser: null})
        }
        const onChange2 = (e) => {
                const {value ,name} = e.target;
                this.setState({[name]: value}) 
        }

        const addUser = () => {
            const newUser = {id:this.state.data.length +1, name:this.state.name}
            this.setState({data: [...this.state.data, newUser], name: ''})
        }
      return(
        <div>
           <div>
           <h1>Table</h1>
            <div>
            <input onChange={onFilter} placeholder="ID" type="number" name='id'/>
            <input onChange={onFilter} placeholder="Name" type="text" name='name'/>
            <input onChange={onFilter} placeholder="Status" type="text" name='status'/>
            <input onChange={onFilter} placeholder="Age" type="number" name='age'/>
            </div>
            <tabel width={'100%'} border={2}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Age</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(data =>(
                       <tr key={data.id}>
                        <td>{data?.id}</td>
                        <td> 
                            <input value={!this.state.selectedUser ? data?.name: this.state.selectedUser.id === data.id ? <input onChange={onChange} name='name' value={this.state.selectedUser.name}/> : data.name}/>
                        </td>
                        <td>
                            <input value={!this.state.selectedUser ? data?.status: this.state.selectedUser.id === data.id ? <input onChange={onChange} name='status' value={this.state.selectedUser.status}/> : data.status}/>
                        </td>
                        <td>
                            <input value={!this.state.selectedUser ? data?.age: this.state.selectedUser.id === data.id ? <input onChange={onChange} name='age' value={this.state.selectedUser.age}/> : data.age}/>
                        </td>
                        <td>
                            <button onClick={() => onDelete(data.id)}>delete</button>
                        </td>
                        <td>
                            {this.state.selectedUser?.id !== data?.id
                            ?
                            <button onClick={()=> onUpdate(data)}>update</button>
                            :
                            <button onClick={onSave}>Save</button>
                        }
                        </td>

وَسِيلَة, [05.03.2023 12:15]
</tr>
                    )
                    )
                    }
                </tbody>
            </tabel>
            <div>
                <input placeholder="Name" type='text' value={this.state.name} onChange={onChange2} name='name'/>
                <input placeholder="Status" type='text' value={this.state.status} onChange={onChange2} name='status'/>
                <input placeholder="Age" type='number' value={this.state.age} onChange={onChange2} name='age'/>
                <button onClick={addUser}>Add</button>
            </div>
           </div>
        </div> 
      )  
    }
}


export default Table