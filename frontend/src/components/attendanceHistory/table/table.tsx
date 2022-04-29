import React, { useEffect, useState } from 'react'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import './style.css'

import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { getAttendance } from '../../../redux/Attendance/attendanceSlice'
const { FilterMatchMode } = require('primereact/api')
const { FilterOperator } = require('primereact/api')

const Table = () => {
  const { loading } = useAppSelector((state) => state.auth)
  const username = localStorage.getItem('user')

  const dispatch = useAppDispatch()

  const [filters1, setFilters1] = useState<any>()
  const [globalFilterValue1, setGlobalFilterValue1] = useState('')

  const [attendanceArray, setAttendanceArray] = useState<any>()
  const useEffectMount = 1

  useEffect(() => {
    initFilters1()

    dispatch(
      getAttendance({
        username,
      }),
    ).then((res: any) => {
      const data = res.payload.attendanceData
      const result = JSON.parse(JSON.stringify(data))

      const getData = (data: any) => {
        var abc = [...data]
        return [...(abc || [])].map((d) => {
          d.date = new Date(d.date)
          return d
        })
      }

      const finalResult = getData(result as any)
      setAttendanceArray(finalResult)
    })
  }, [useEffectMount])

  const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const clearFilter1 = () => {
    initFilters1()
  }

  const statuses = ['Present', 'Leave', 'Absent']

  const initFilters1 = () => {
    setFilters1({
      global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS,
      },
      username: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },

      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    })
    setGlobalFilterValue1('')
  }

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value
    let _filters1 = { ...filters1 }
    _filters1['global'].value = value
    setFilters1(_filters1)
    setGlobalFilterValue1(value)
  }

  const renderHeader1 = () => {
    return (
      <div className="p-d-flex p-jc-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    )
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date)
  }

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    )
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    )
  }

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    )
  }

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>
  }

  const header1 = renderHeader1()

  return (
    <div className=" datatable-filter-demo">
      <div className="row  d-flex d-lg-flex d-md-flex justify-content-md-center  justify-content-center mt-5">
        <div className="col-lg-8 col-10">
          <div
            className="card"
            style={{ margin: '0px auto', marginTop: '1rem' }}
          >
            <DataTable
              value={attendanceArray}
              paginator
              className="p-datatable-customers"
              showGridlines
              rows={5}
              dataKey="id"
              filters={filters1}
              filterDisplay="menu"
              loading={loading}
              responsiveLayout="scroll"
              globalFilterFields={['username', 'status']}
              header={header1}
              emptyMessage="No Result found."
            >
              <Column
                field="username"
                header="Name"
                filter
                filterPlaceholder="Search by name"
                style={{ minWidth: '12rem' }}
              />

              <Column
                header="Date"
                filterField="date"
                dataType="date"
                style={{ minWidth: '10rem' }}
                body={dateBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
              />

              <Column
                field="status"
                header="Status"
                filterMenuStyle={{ width: '14rem' }}
                style={{ minWidth: '12rem' }}
                body={statusBodyTemplate}
                filter
                filterElement={statusFilterTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
