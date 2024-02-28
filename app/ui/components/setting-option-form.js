'use client'

import { useFormState } from 'react-dom'
import { updateSetting } from '@/app/lib/action/setting-action'

import ErrorTip from '@/app/ui/components/error-tip'
import MediumBody from '@/app/ui/components/typography/medium-body'
import SmallTitle from '@/app/ui/components/typography/small-title'
import Space from '@/app/ui/components/space'

import styles from './settingOptionForm.module.css'
import Button from './button'

export default function SettingOptionsForm(props) {
    const initialState = { message: null, errors: {} }
    const [state, dispatch] = useFormState(updateSetting, initialState)

    const {
        title,
        description,
        uid,
        value
    } = props

    function getValue(value) {
        if (value === 0) {
            return 1
        } else {
            return 0
        }
    }

    return (
        <section>
            <form action={dispatch}>
                <div className={styles.option}>
                    <SmallTitle>
                        {title}
                    </SmallTitle>
                    <Space />
                    <MediumBody>
                        {description}
                    </MediumBody>
                    <input
                        type='hidden'
                        name='value'
                        defaultValue={getValue(value)} />
                    <input
                        type='hidden'
                        name='uid'
                        defaultValue={uid} />
                </div>
                <Button type='submit'>{value === 0 ? '否' : '是'}</Button>
            </form>
            <ErrorTip state={state} />
        </section>
    )
}