import clsx from 'clsx'

import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'

import styles from './button.module.css'

export default function Button({ children, className, ...rest }) {
    return (
        <button
            {...rest}
            className={clsx(
                styles.button,
                className
            )}>
            <ExtremeSmallTitle>
                {children}
            </ExtremeSmallTitle>
        </button>
    )
}