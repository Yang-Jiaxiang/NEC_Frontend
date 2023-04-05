import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/styles'
import Swal from 'sweetalert2'

const useAlert = () => {
    const [alertData, setAlertData] = useState(null)
    const theme = useTheme()

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    useEffect(() => {
        if (alertData) {
            const { type, options, toastTitle, alertTitle, text, icon = 'success', event, preConfirm } = alertData
            switch (type) {
                case 'confirm':
                    Swal.fire({
                        title: alertTitle,
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        confirmButtonColor: theme.palette.red.main,
                        cancelButtonText: `取消`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            event().then(() =>
                                Toast.fire({
                                    icon: icon,
                                    title: toastTitle,
                                    text: text,
                                }).then(handleClose)
                            )
                        } else {
                            handleClose()
                        }
                    })
                    break
                case 'input':
                    Swal.fire({
                        title: alertTitle,
                        input: 'text',
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        confirmButtonColor: theme.palette.primary.main,
                        cancelButtonText: `取消`,
                        inputValidator: (text) => {
                            return !text && '輸入點什麼吧'
                        },
                        preConfirm: async (text) => {
                            const { exists, warning } = await preConfirm(text)
                            return !exists ? event(text) : Swal.showValidationMessage(warning)
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Toast.fire({
                                icon,
                                title: toastTitle,
                                text,
                            }).then(handleClose)
                        } else {
                            handleClose()
                        }
                    })
                    break
                case 'select':
                    Swal.fire({
                        title: alertTitle,
                        input: 'select',
                        inputOptions: options,
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        confirmButtonColor: theme.palette.primary.main,
                        cancelButtonText: `取消`,
                        preConfirm: async (text) => {
                            return event(text)
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Toast.fire({
                                icon,
                                title: toastTitle,
                                text,
                            }).then(handleClose)
                        } else {
                            handleClose()
                        }
                    })
                    break
                default:
                    Toast.fire({
                        icon,
                        title: toastTitle,
                        text,
                    }).then(handleClose)
            }
        }
    }, [alertData])

    const handleClose = () => {
        setAlertData(null)
    }

    const showAlert = (options) => {
        setAlertData(options)
    }

    return showAlert
}

export default useAlert
