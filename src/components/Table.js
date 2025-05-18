import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
// import { Fieldset } from 'primereact/fieldset';
import * as dayjs from 'dayjs'
import React, { useState } from 'react';
import {registrarTarea, actualizarTarea, updateTask, eliminarTarea} from '../services/Task'
import Swal from 'sweetalert2'
import { Tag } from 'primereact/tag';

const Table = ({items, itemsProgress, itemsFinished}) => {
  const [task, setTask] = useState(null)
  const [taskDialog, setTasktDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState('')
  const today = new Date()
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion:'',
    fechaLimite:null
  })

  const limitDate = new Date(today)
  limitDate.setDate(today.getDate() + 21);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const registerTask = async() =>{
    const response = await registrarTarea({
      formData
    })
    if(!response.data.success){
      Swal.fire({
          icon: "error",
          title: "Registro Fallido",
          text: "Hubo un problema la registrar la tarea",
      });
    }
    Swal.fire({
      title: "Se registro la tarea con exito",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    setFormData({
      titulo: '',
      descripcion:'',
      fechaLimite:null
    })
    setTasktDialog(false);
    setTimeout(()=>regresh(), 1500)
  }

  const editProduct = (task) => {
    setTitleDialog("Editar Tarea")
    setFormData({ 
      id:task.id,
      titulo: task.titulo,
      descripcion:task.descripcion,
      fechaLimite: dayjs(task.fechaLimite).toDate()});
    setTasktDialog(true);
  };

  const actualizarData = async () => {
    const response = await actualizarTarea(formData)
    if(!response.data.success){
      Swal.fire({
          icon: "error",
          title: "Actualizacion Fallida",
          text: "Hubo un problema al actualizar el usuario",
      });
    }
    Swal.fire({
      title: "Se actualizo el usuario con exito",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    setFormData({
      titulo: '',
      descripcion:'',
      fechaLimite:null
    })
    setTasktDialog(false);
    setTimeout(()=>regresh(), 1500)
  }

  const openNew = () => {
    setTitleDialog("Registrar Tarea")
    setFormData({
      titulo: '',
      descripcion:'',
      fechaLimite:null
    })
    setTasktDialog(true);
 };

 const regresh = () => {
    window.location.reload();
 }

 const changeState = async(rowData) => {
  const response = await updateTask(rowData)
  if(!response.data.success){
    Swal.fire({
        icon: "error",
        title: "Fallo actulizar la tarea",
        text: "Hubo un problema al actualizar la tarea",
    });
  }
  Swal.fire({
    title: "Se actualizo la tarea con exito",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(()=>regresh(), 1500)
 }

 const deleteTask = async(data) => {
  const response = await eliminarTarea(data);
  if(!response.data.success){
    Swal.fire({
        icon: "error",
        title: "Fallo al eliminar una tarea",
        text: "Hubo un problema al eliminar la tarea",
    });
  }
  Swal.fire({
    title: "Se elimino la tarea con exito",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
  setTimeout(()=>regresh(), 1500)
 }

  const rightToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-4 ">
            <Button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg'  label="Recargar" icon="pi pi-refresh" onClick={regresh} />
            <Button className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg'  label="Nuevo" icon="pi pi-plus" onClick={openNew} />
        </div>
    );
  };

  const Edith = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => editProduct(rowData)}/>
            <Button icon="pi pi-arrow-right" rounded outlined className='mr-2 bg-green-500 hover:bg-green-600 text-white' onClick={() => changeState(rowData)}/>
            <Button icon="pi pi-trash" rounded outlined className='mr-2 bg-red-500 hover:bg-red-600 text-white' onClick={() => deleteTask(rowData)}/>
        </React.Fragment>
    );
  };

  const footerContent = (data) => {
    if(data === "Editar Tarea"){
      return(
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setTasktDialog(false)} className="p-button-text" />
            <Button label="Actualizar" icon="pi pi-check" onClick={() => actualizarData()} autoFocus />
        </div>
        )
    }else{
      return(
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setTasktDialog(false)} className="p-button-text" />
            <Button label="Registrar" icon="pi pi-check" onClick={() => registerTask()} autoFocus />
        </div>
      )
    }
    
  };

  const footerContentPregress = (data) =>{
    return (
      <React.Fragment>
          <Button icon="pi pi-arrow-right" rounded outlined className='bg-green-500 hover:bg-green-600 text-white' onClick={() => changeState(data)} />
      </React.Fragment>
    );
  }

  const footerContentEnd = (data) =>{
    return (
      <React.Fragment>
          <Button icon="pi pi-trash" rounded outlined className='bg-red-500 hover:bg-red-600 text-white' onClick={() => deleteTask(data)}/>
      </React.Fragment>
    );
  }

  return (
      <div className='px-10 h-screen'>
        <Toolbar className="mb-4 bg-white shadow-lg" right={rightToolbarTemplate}></Toolbar>
        {/* <DataTable className='shadow-xl rounded-lg' value={items}>
              {headers.map(header => (
                  <Column field={header} header={header.toUpperCase()}></Column>
              ))}
              <Column header="ACCIONES" body={acciones}/>
        </DataTable> */}
        <div className='w-[100%] h-[8%] bg-white py-4 mb-4 flex flex-row place-content-between rounded-3xl shadow-2xl px-36'>
            <h2 className='font-sans text-xl'>Pendientes</h2>
            <h2 className='font-sans text-xl'>Progreso</h2>
            <h2 className='font-sans text-xl'>Finalizadas</h2>
        </div>
        <div className='flex flex-row gap-3 h-[80%] bg-[#f1f1f1] rounded-lg shadow-2xl'>
          <Panel className='w-[33%] h-[100%] bg-white rounded-lg overflow-auto shadow-2xl'>
            {items.map(item => (
              <Card title={item.titulo} className='shadow-2xl mb-3 bg-yellow-100' footer={Edith(item)}>
                  <p className="m-0">{item.descripcion}</p>
                  <p className="m-0 text-end">{dayjs(item.fechaLimite).format('DD/MM/YYYY')}</p>
                  <Tag className="mr-2" severity="warning" icon="pi pi-clock	" value="PENDIENTE"></Tag>
              </Card>
            ))}
          </Panel>
          <Panel className='w-[33%] h-[100%] bg-white rounded-lg overflow-auto shadow-2xl'>
             {itemsProgress.map(item => (
              <Card title={item.titulo} className='shadow-2xl mb-3 bg-blue-100' footer={footerContentPregress(item)}>
                <p className="m-0">{item.descripcion}</p>
                <p className="m-0">{dayjs(item.fechaLimite).format('DD/MM/YYYY')}</p>
                <Tag className="mr-2" severity="info" icon="pi pi-spinner" value="PROGRESO"></Tag>
              </Card>
             ))}
          </Panel>
          <Panel className='w-[33%] h-[100%] bg-white rounded-lg overflow-auto shadow-2xl'>
              {itemsFinished.map(item => (
                <Card title={item.titulo} className='shadow-2xl mb-3 bg-green-100' footer={footerContentEnd(item)}>
                  <p className="m-0">{item.descripcion}</p>
                  <p className="m-0">{dayjs(item.fechaLimite).format('DD/MM/YYYY')}</p>
                  <Tag className="mr-2" severity="success" icon="pi pi-check-circle" value="FINALIZADO"></Tag>
                </Card>
             ))}
          </Panel>
        </div>
        <Dialog header={titleDialog} visible={taskDialog} className='w-[50%]' onHide={() => {if (!taskDialog) return; setTasktDialog(false); }} footer={footerContent(titleDialog)}>
            <div className="card p-5">
                <form onSubmit={registerTask}>
                  <div className='flex flex-col-2 gap-3'>
                    <div className="my-2">
                      <label className="mb-2 font-sans">Titulo</label>
                      <InputText type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                    </div>
                    <div className="my-2 flex flex-col">
                      <label className="font-sans">Fecha Limite</label>
                      <Calendar minDate={today} maxDate={limitDate}  dateFormat='dd/mm/yy' id="fecha" name="fechaLimite" value={formData.fechaLimite} onChange={handleChange}  className='border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg'/>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="mb-2 font-sans">Descripcion</label>
                    <InputTextarea  rows={5} cols={30} type="text" id="descripcion" name="descripcion" onChange={handleChange} value={formData.descripcion} required className="border-2 border-gray-200 hover:border-gray-400 w-[100%] rounded-lg p-2 shadow-lg"/>
                  </div>
                </form>
            </div>
        </Dialog>
      </div>
      
      
  )
};

export default Table;