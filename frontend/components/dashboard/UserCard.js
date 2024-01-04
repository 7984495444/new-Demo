import Link from "next/link";
import Image from "next/image";
import { UserPlaceholderA, profilePlaceholder } from "@/assets/images/index";
import { Card, CardBody, Badge } from "reactstrap";
import { t } from "i18next";

function UserCard() {
  return (
    <Card className="border-light-blue-c user-main">
      <CardBody className="pt-5 pb-3 text-center">
        <Image
          className="avatar w-16 h-16 rounded-circle bg-light-blue-a"
          src={profilePlaceholder}
          alt="User Image"
        />
        <h6 className="mt-3 user-name">John Bardot</h6>
        <div className="mt-2">
          <Badge color="none" className="user-designation">
            {t("UserCard.Designation")}
          </Badge>
        </div>
        <Link
          className="btn btn-dark-blue-c font-bold mt-4 user-view-more"
          href="/"
        >
          {t("UserCard.ProfileBtn")}
        </Link>
        <p className="text-light-blue-a mt-3 user-member-since">
          {t("UserCard.Profile")} Juin 2023
        </p>
      </CardBody>
    </Card>
  );
}

export default UserCard;
