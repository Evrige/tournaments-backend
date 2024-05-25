import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class RatingService {
	constructor(private prisma: PrismaService) {
	}
	async getRating(teamOrUser: string) {
		if (teamOrUser === "team") {
			const teamRatings = await this.prisma.team_Rating.findMany({
				orderBy: {
					points: 'desc'
				},
				include:{
					team: true
				},
				take: 50
			});
			return teamRatings;
		} else {
			const userRatings = await this.prisma.user_Rating.findMany({
				orderBy: {
					points: 'desc'
				},
				include:{
					user: {
						select: {
							nickname: true,
							id: true,
							avatar: true
						}
					}
				},
				take: 50
			});
			return userRatings;
		}
	}

}
