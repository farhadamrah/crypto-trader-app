import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = props => {
    const { children: columns, records: rows, ...tableProps } = props;

    return (
        <div className='overflow-x-auto overflow-y-hidden ounded'>
            <table className={'divide-y divide-gray-200 w-full'} {...tableProps}>
                <thead className={'bg-gray-50'}>
                    <tr>
                        {columns.map(column => (
                            <th
                                scope='col'
                                className={classNames(
                                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                )}
                            >
                                {column.props.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={'bg-white divide-y divide-gray-200'}>
                    {rows.map(row => (
                        <tr>
                            {columns.map(column => {
                                const { dataIndex, render } = column.props;

                                const cellData = dataIndex ? row[dataIndex] : render ? row : null;

                                return (
                                    <td className={'px-4 py-4'}>
                                        {column.props.render ? column.props.render(cellData) : cellData}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {};

Table.Column = () => {
    return null;
};

export default Table;
