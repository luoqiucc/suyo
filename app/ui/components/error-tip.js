import { IconAlertCircle } from '@tabler/icons-react'

import MediumBody from '@/app/ui/components/typography/medium-body'

export default function ErrorTip(props) {
    const { state } = props

    return (
        <>
            {!(!state || !state.errors.errorMessage || state.errors.errorMessage === 'NEXT_REDIRECT' || !state.errors.errorMessage) && (
                <div
                    style={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <IconAlertCircle size={24} />
                    <MediumBody style={{ marginLeft: 'calc(1 * var(--space))' }}>
                        {state.errors.errorMessage}
                    </MediumBody>
                </div>
            )}
        </>
    )
}