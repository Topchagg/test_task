interface modalWindow {
    onSubmit?: () => any,
    onDecline?: () => any,
    Component?: React.ComponentType
}

export type {modalWindow}