import { Modal, Tree } from "antd";
import { useState } from "react";

export default ({ visible, setVisible }) => {
  const [selecKeys, setSelectKeys] = useState([]);
  function onOk() {
    console.log(selecKeys);
  }
  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
        },
      ],
    },
    {
      title: "parent 2",
      key: "0-0-2",
      children: [
        {
          title: "parent 1-2",
          key: "0-0-1-2",
        },
        {
          title: "parent 1-2",
          key: "0-0-0-1-2",
        },
      ],
    },
  ];

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={onOk}
      title="新增角色"
    >
      <Tree
        checkable
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        defaultSelectedKeys={["0-0-0", "0-0-1"]}
        defaultCheckedKeys={["0-0-0", "0-0-1"]}
        onCheck={setSelectKeys}
        treeData={treeData}
      />
    </Modal>
  );
};
