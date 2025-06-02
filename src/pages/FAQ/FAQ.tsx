import React from 'react';
import { Collapse, Typography, Space } from 'antd';
import { QuestionCircleOutlined, MailOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './FAQ.scss';

const { Title, Text, Link } = Typography;
const { Panel } = Collapse;

interface FAQItem {
    key: string;
    question: string;
    answer: string;
}

const FAQ: React.FC = () => {
    const faqData: FAQItem[] = [
        {
            key: '1',
            question: 'Is linen clothing prone to wrinkles?',
            answer: 'Yes, linen naturally has a textured finish that can result in wrinkles. However, this is part of its unique beauty and relaxed aesthetic. If you prefer a smoother look, you can iron your linen garments on a low setting or steam them to reduce wrinkles.'
        },
        {
            key: '2',
            question: 'How should I care for my linen and cotton garments?',
            answer: 'To keep your linen and cotton clothing looking their best, we recommend hand washing. Avoid bleach and fabric softeners, as these can damage the fibers. Air dry your garments. For linen items, you may notice a slight wrinkling, which is part of the fabric\'s natural charm.'
        },
        {
            key: '3',
            question: 'Do linen and cotton fabrics shrink after washing?',
            answer: 'Linen and cotton may shrink slightly after the first wash, but this is typical for natural fibers. To minimize shrinkage, we recommend washing in cold water and air drying your garments.'
        },
        {
            key: '4',
            question: 'Do you offer exchanges or returns?',
            answer: 'We strive to ensure you\'re completely satisfied with your purchase. We only accept returns or exchanges for items that are the wrong size or are faulty. Refer to our Return & Exchange Policy for detailed instructions.'
        },
        {
            key: '5',
            question: 'Can I amend my order?',
            answer: 'Once your order is placed, we begin processing it right away to ensure quick shipping. Unfortunately, we are unable to make any amendments to orders once they have been confirmed. If you realize there\'s an issue with your order, such as selecting the wrong size or product, please contact our customer support team immediately. We\'ll do our best to assist, but once the order has been shipped, no changes can be made.'
        }
    ];

    return (
        <div className="faq-container">
            <div className="faq-content">
                <Space direction="vertical" size="large" className="faq-header">
                    <Title level={2} className="faq-title">
                        Frequently Asked Questions
                    </Title>
                    <Text className="faq-subtitle">
                        If you can't find the answer to your question on this page
                    </Text>
                    <Text className="faq-subtitle">
                        Please contact Customer Service at{' '}
                        <Link href="mailto:Maahstudio@outlook.com" className="faq-email">
                            <MailOutlined /> Maahstudio@outlook.com
                        </Link>
                    </Text>
                </Space>

                <Collapse
                    className="faq-collapse"
                    expandIcon={({ isActive }) =>
                        isActive ? <MinusOutlined className="collapse-icon" /> : <PlusOutlined className="collapse-icon" />
                    }
                    size="large"
                    ghost
                >
                    {faqData.map((item) => (
                        <Panel
                            header={<span className="panel-header">{item.question}</span>}
                            key={item.key}
                            className="faq-panel"
                        >
                            <div className="panel-content">
                                {item.answer}
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

export default FAQ;