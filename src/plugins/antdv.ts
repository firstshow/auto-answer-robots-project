import { Button, Table, Badge, Form, Input, Textarea, List, Row, Col, Popconfirm, Dropdown, Menu, MenuItem, Modal, Image, InputNumber, Checkbox, Progress } from 'ant-design-vue';

function useComponent(app: any) {
    app
    .use(Button)
    .use(Table)
    .use(Badge)
    .use(Form)
    .use(Input)
    .use(Textarea)
    .use(List)
    .use(Row)
    .use(Col)
    .use(Popconfirm)
    .use(Dropdown)
    .use(Menu)
    .use(MenuItem)
    .use(Modal)
    .use(Image)
    .use(InputNumber)
    .use(Checkbox)
    .use(Progress)
}

export default useComponent