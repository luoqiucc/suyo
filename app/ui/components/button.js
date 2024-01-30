import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'

import styles from './button.module.css'

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={styles.button}>
            <ExtremeSmallTitle>
                {props.children}
            </ExtremeSmallTitle>
        </button>
    )
}