import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';


function MenuTop() {
    console.log('MenuTop')
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
            <Link to="/">
            <Menu.Item key="mail" icon={<MailOutlined />}>
                Home Page
            </Menu.Item>
            </Link>
            <Menu.SubMenu key="SubMenu" title="Movies" icon={<SettingOutlined />}>
                <Menu.Item key="two" icon={<AppstoreOutlined />}>
                    Navigation Two
                </Menu.Item>
                <Menu.Item key="three" icon={<AppstoreOutlined />}>
                    Navigation Three
                </Menu.Item>
                <Menu.ItemGroup title="Item Group">
                    <Menu.Item key="four" icon={<AppstoreOutlined />}>
                        Navigation Four
                    </Menu.Item>
                    <Menu.Item key="five" icon={<AppstoreOutlined />}>
                        Navigation Five
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        </Menu>
    );
}

export default MenuTop;
