import { Button, Table, Badge, Form, Input, Textarea, List, Row, Col } from 'ant-design-vue';

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
}

export default useComponent