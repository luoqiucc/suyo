'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { IconX } from '@tabler/icons-react'

import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import Space from '@/app/ui/components/space'

import styles from './dialog.module.css'

export default function Dialog(props) {

    const [isClose, setIsClose] = useState(true)

    const {
        button = <h5>action</h5>,
        body = <h5>body</h5>,
        title = '对话'
    } = props

    return (
        <section className={props.className}>
            <section
                onClick={() => setIsClose(false)}>
                {button}
            </section>
            <section
                className={clsx(
                    styles.dialogContent,
                    {
                        [styles.close]: isClose
                    }
                )}>
                <div className={styles.title}>
                    <ExtremeSmallTitle>{title}</ExtremeSmallTitle>
                    <IconX
                        size={20}
                        onClick={() => setIsClose(true)} />
                </div>
                <Space magnification={2} />
                {body}
            </section>
            <section
                className={clsx(
                    styles.modal,
                    {
                        [styles.close]: isClose
                    })} />
        </section>
    )
}