import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { useState } from "react";
import { requestGet } from "../../../utils";
import Add from "./component/Add";
export default () => {
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "角色说明",
      dataIndex: "remark",
      key: "remark",
      align: "center",
      hideInSearch: true,
    },
  ];
  return (
    <div>
      <ProTable
        rowKey={"id"}
        columns={columns}
        request={async (params) => {
          params.page = params.current;
          delete params.current;
          const res = await requestGet("role", params);
          const [data] = res;
          console.log('data: ', data);
          return { data, params };
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => setVisible(true)}>
            新增角色
          </Button>,
        ]}
      />
      <Add visible={visible} setVisible={setVisible}/>
    </div>
  );
};
