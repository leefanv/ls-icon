import Link from "next/link";

import LeftIcon from "../../../assets/icons/left.svg";

import styles from './Breadcrumbs.module.scss';

interface Breadcrumb {
  name: string;
  title: string;
  route: string;
}

type BreadcrumbsProps = {
  data: Breadcrumb[];
};


function Breadcrumbs({ data }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      {data.map((breadcrumb, index) => {
        const isLasted = index === data.length - 1;

        return (
          <div key={breadcrumb.name} className={styles.breadcrumb}>
            {isLasted ? <span>{breadcrumb.title}</span> : <Link className={styles.link} href={breadcrumb.route}>{breadcrumb.title}</Link>}
            {!isLasted && <LeftIcon className={styles.icon} />}
          </div>
        )
      })}
    </div>
  )
}

export default Breadcrumbs;
