import React from 'react';
import { Tabs, Steps, Card, Typography, Divider } from 'antd';
import { ShoppingCartOutlined, CreditCardOutlined, UserOutlined, SafetyOutlined, FileDoneOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './Guide.scss';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Guide: React.FC = () => {
    const orderSteps = [
        {
            title: 'ADD TO CART',
            icon: <ShoppingCartOutlined />,
            description: 'Add your desired items to the shopping cart'
        },
        {
            title: 'CHECKOUT',
            icon: <CreditCardOutlined />,
            description: 'Review your order and proceed to checkout'
        },
        {
            title: 'LOG IN / CREATE ACCOUNT',
            icon: <UserOutlined />,
            description: 'Sign in to your account or create a new one'
        },
        {
            title: 'SELECT PAYMENT METHOD',
            icon: <SafetyOutlined />,
            description: 'Choose your preferred payment method'
        },
        {
            title: 'CONFIRM SHIPPING DETAILS',
            icon: <FileDoneOutlined />,
            description: 'Enter and confirm your shipping information'
        },
        {
            title: 'ORDER CONFIRMED',
            icon: <CheckCircleOutlined />,
            description: 'Your order has been successfully placed'
        }
    ];

    return (
        <div className="guide-container">
            <Title level={2} className="guide-title">
                Guide
            </Title>
            <div className="guide-content">

                <Tabs defaultActiveKey="1" centered className="guide-tabs">
                    <TabPane tab="HOW TO ORDER" key="1">
                        <div className="how-to-order-content">
                            <Steps
                                direction="vertical"
                                current={-1}
                                className="order-steps"
                                items={orderSteps.map((step, index) => ({
                                    title: step.title,
                                    description: step.description,
                                    icon: step.icon,
                                    status: 'wait'
                                }))}
                            />

                            <div className="order-note">
                                <Text type="secondary" className="note-text">
                                    *Please note that items added into cart will not be reserved until payment made.
                                </Text>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="PAYMENT METHOD" key="2">
                        <div className="payment-method-content">
                            <Paragraph className="payment-intro">
                                We accept payment with bank transfer and DuitNow QR. Please upload your receipt
                                after payment. All UNPAID Order(s) will be cancelled automatically after 24 hours.
                            </Paragraph>

                            <div className="payment-sections">
                                <div className="bank-transfer-section">
                                    <Card className="payment-card">
                                        <Title level={4}>Bank Transfer</Title>
                                        <div className="bank-details">
                                            <div className="detail-row">
                                                <Text className="detail-label">Beneficiary Name:</Text>
                                                <Text className="detail-value">MAAH STUDIO</Text>
                                            </div>
                                            <div className="detail-row">
                                                <Text className="detail-label">Account number:</Text>
                                                <Text className="detail-value">7101374434</Text>
                                            </div>
                                            <div className="detail-row">
                                                <Text className="detail-label">Bank:</Text>
                                                <Text className="detail-value">OCBC (Malaysia) berhad</Text>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="duitnow-section">
                                    <Card className="payment-card">
                                        <Title level={4}>DuitNow QR</Title>
                                        <div className="duitnow-content">
                                            <Paragraph className="duitnow-text">
                                                Scan our DuitNow QR with any of your banking or ewallet app that support DuitNow payment.
                                            </Paragraph>
                                            <Paragraph className="duitnow-text singapore-note">
                                                For Singapore customers, simply scan and pay via NETS or PayNow QR.
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Guide;