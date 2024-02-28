'use client'

export default function DocReader(props) {
    const {
        body = '',
        styles = ''
    } = props

    const html = { __html: body }

    return (
        <>
            <style jsx>{styles}</style>
            <style jsx>{`
                .reader{
                    font-size: 150%;
                }
            `}</style>

            <div
                className='reader'
                dangerouslySetInnerHTML={html} />
        </>
    )
}