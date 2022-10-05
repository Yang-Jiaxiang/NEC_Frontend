import React, { Fragment, useState, useEffect } from 'react'

import useStyles from './Style'
import REPORTCOLS from '../../Assets/Json/ReportCols.json'
import REPORTCOLS2 from '../../Assets/Json/ReportCols2.json'

import { useSelector } from 'react-redux'
import { Announcement } from '@mui/icons-material'

export const ReportFormForPDF = React.forwardRef((_, ref) => {
    return (
        <div style={{ width: '100%', padding: '3rem' }} ref={ref}>
            <FormHeader />
            <PatientForm />
            <ReportFormHtml print={true} />
            <FormFooter />
        </div>
    )
})

const ReportFormHtml = ({ print }) => {
    const classes = useStyles()

    return (
        <table className={classes.table} style={{ width: '90%', margin: 'auto' }}>
            <tbody>
                <tr>
                    <td colSpan="4" className={classes.table} style={{ textAlign: 'center' }}>
                        <b>檢查適應症</b>
                    </td>
                </tr>
                {REPORTCOLS.filter(l => l.section === 'Indication').map(list => (
                    <IndicationSection key={list.name} list={list} />
                ))}

                {[...REPORTCOLS, ...REPORTCOLS2]
                    .filter(l => l.section !== 'Indication')
                    .map(list => (
                        <OtherSection list={list} />
                    ))}
            </tbody>
        </table>
    )
}

const IndicationSection = ({ list }) => {
    const classes = useStyles()
    const report = useSelector(state => state.reportForm.edit)
    const [cancerArr, setCancerArr] = useState([])
    // useEffect(() => {
    //     if (report) {
    //         setCancerArr(report[list.name])
    //     }
    // }, [report])

    return (
        <tr>
            <td colSpan="4" className={classes.table}>
                {(list.type === 'radio' || list.type === 'select') && (
                    <>
                        <input type="checkbox" readOnly />
                        {list.label}
                        <>
                            {list.options.map(option => (
                                <>
                                    <input
                                        type="radio"
                                        value={option.value}
                                        // checked={cancerArr?.some(c => c.name === list.name && c.value?.includes(option.value))}
                                        readOnly
                                    />
                                    {option.label}
                                </>
                            ))}
                        </>
                    </>
                )}
                {list.type === 'checkbox' && (
                    <>
                        <input type="checkbox" readOnly />
                        {list.label}
                    </>
                )}
                {list.type === 'text' && (
                    <>
                        <input type="checkbox" readOnly />
                        {list.label}:{cancerArr?.find(c => c.name === list.name)?.value}
                    </>
                )}
            </td>
        </tr>
    )
}

const OtherSection = ({ list }) => {
    const classes = useStyles()
    return (
        <>
            {(list.type === 'redio' || list.type === 'select') && (
                <tr className={classes.table}>
                    <td>
                        <input type="checkbox" readOnly />
                        {list.label}
                    </td>

                    <td className={classes.table}>
                        {list?.options?.map(option => (
                            <div>
                                <input
                                    type="radio"
                                    value={option.value}
                                    // checked={cancerArr?.some(c => c.name === col.name && c.value?.includes(option.value))}
                                    readOnly
                                />
                                {option.label}
                            </div>
                        ))}
                    </td>
                </tr>
            )}
            {list.type === 'text' && (
                <tr>
                    <td style={{ width: '10%', height: '3rem' }} className={classes.table}>
                        {list.label}
                    </td>
                    <td style={{ width: '10%' }} className={classes.table}></td>
                </tr>
            )}
        </>
    )
}

const PatientForm = () => {
    const classes = useStyles()

    const {
        row: { patient },
    } = useSelector(state => state.dialog.report)

    return (
        <table className={classes.table} style={{ width: '90%', margin: 'auto', marginBottom: '1rem' }}>
            <tr>
                <td className={classes.table}>
                    <b>姓名</b>
                </td>
                {patient ? <td className={classes.table}>{patient?.name}</td> : <td className={classes.table}>&emsp;&emsp;&emsp;</td>}
                <td className={classes.table}>
                    <b>性別</b>
                </td>
                <td className={classes.table}>
                    <input type="checkbox" checked={patient?.gender === 'm'} readOnly />男
                    <input type="checkbox" checked={patient?.gender === 'f'} readOnly />女
                </td>
                <td className={classes.table}>
                    <b>出生年月日</b>
                </td>
                {patient ? (
                    <td className={classes.table}>{new Date(patient?.birth).toLocaleDateString()}</td>
                ) : (
                    <td className={classes.table}>&emsp;&emsp;&emsp;</td>
                )}
            </tr>
            <tr>
                <td className={classes.table}>
                    <b>電話</b>
                </td>
                <td className={classes.table} colSpan="5">
                    {patient?.phone}
                </td>
            </tr>
            <tr>
                <td className={classes.table}>
                    <b>部門單位</b>
                </td>
                <td className={classes.table} colSpan="2">
                    {patient?.department}
                </td>
                <td className={classes.table}>
                    <b>身份證字號</b>
                </td>
                <td className={classes.table} colSpan="2">
                    {patient?.id}
                </td>
            </tr>
        </table>
    )
}

const FormHeader = () => {
    const {
        row: { createdAt },
    } = useSelector(state => state.dialog.report)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <b style={{ fontSize: '1.5rem' }}>乳房超音波檢查報告單</b>
            <hr></hr>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                <div>檢查日期 : {new Date(createdAt).toLocaleDateString()}</div>
                <div>報告列印時間 : {new Date().toLocaleString()}</div>
            </div>
        </div>
    )
}
const FormFooter = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem' }}>~感謝您參與本次檢驗活動，祝您健康~ 肝病諮詢專線 : 0800-000-583</p>
        </div>
    )
}

export default ReportFormHtml
